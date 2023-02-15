import asuid from "@labyrinthos/asuid"

const fireEach = (array, args) => {
    if (array === undefined) {
        return
    }
    for (let index = 0; index < array.length; index += 1) {
        array[index](...args)
    }
}

const signal = () => {
    let handlers = {}
    let handlerList = []
    const signal = (handler) => {
        const id = asuid()
        handlers[id] = handler
        handlerList = Object.values(handlers)
        const remove = () => {
            delete handlers[id]
            handlerList = Object.values(handlers)
        }
        remove.id = id
        return remove
    }
    signal.enabled = true
    signal.has = (rem) => handlers[rem?.id ?? rem] !== undefined
    signal.fire = (...args) => {
        if (signal.enabled === false) {
            return
        }
        fireEach(handlerList, [...args, signal])
    }
    signal.clear = () => {
        handlers = {}
        handlerList = []
    }

    return signal
}

export default signal
