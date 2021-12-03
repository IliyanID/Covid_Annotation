export type globalProps = {
    eid:string,
    name:string,
    account_type: 'validator' | 'admin' | 'NA',
    [key: string]: any
}

export const globalPropsDefaultObj:globalProps = {
    eid:'-1',
    name:'NA',
    account_type:'NA'
} as const