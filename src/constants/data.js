module.exports = {
    contracts: [
        {
            stage: 'PENDING_CLIENT_SIGN',
            stage_description: 'Pendign Client Signature',
            name: 'Sports 1',
            createdAt: '10-12-2018'
        }
    ],
    users: [
        {
            value: '1',
            name: 'User 1',
            email: 'mahdiye@gumgum.com'
        },
        {
            value: '2',
            name: 'User 2',
            email: 'mahdiye@gumgum.com'
        }
    ],
    clients: [
        {
            value: '11',
            name: 'Client 1',
            email: 'mahdiye@gumgum.com'
        },
        {
            value: '22',
            name: 'Client 2',
            email: 'mahdiye@gumgum.com'
        }
    ],
    stages: [
        {
            stage: 'PENDING_CLIENT_SIGN',
            description: 'Pending Client Signature',
            class: 'gds-tag--warning'
        },
        {
            stage: 'PENDING_FINAL_SIGN',
            description: 'Pending Final Signature',
            class: 'gds-tag--purple'
        },
        {
            stage: 'EXECUTED',
            description: 'Executed',
            class: 'gds-tag--darkgreen'
        },
        {
            stage: 'PASSED_END_DATE',
            description: 'Passed End Date',
            class: 'gds-tag--danger'
        }
    ],
    contract_types: [
        { name: 'Sports', value: 'SPORTS'}
    ]
}