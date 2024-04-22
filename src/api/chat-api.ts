let subcribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null
type EventNamesType = 'messages-received' | 'status-changed'

const closeHandler = () => {
    console.log('CLOSE WS')
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subcribers['messages-received'].forEach(s => s(newMessages))
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('REFRESH PAGE')
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subcribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        subcribers['messages-received'] = []
        subcribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(EventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subcribers[EventName].push(callback)
        return () => {
            // @ts-ignore
            subcribers[EventName] = subcribers[EventName].filter(s => s !== callback)
        }
    },
    unsubscribe(EventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subcribers[EventName] = subcribers[EventName]
            .filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type ChatMessageApiType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export type StatusType = 'pending' | 'ready' | 'error'

type MessagesReceivedSubscriberType = (messages: ChatMessageApiType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void