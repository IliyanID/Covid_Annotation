export type globalProps = {
    eid:string,
    name:string,
    account_type: 'validator' | 'admin' | 'NA',
    [key: string]: any
}

export const globalPropsDefaultObj:globalProps = {
    eid:'832542166',
    name:'Iliyan Dimitrov',
    account_type:'validator'
} as const