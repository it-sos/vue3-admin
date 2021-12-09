interface Result {
    retcode: number,
    msg: string
    data: any
}

interface HttpResult {
    status: number
    statusText: string
    data: Result
}

interface Option {
    label: any
    value: any
}