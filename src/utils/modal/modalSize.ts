export function modalSize(type: string) {
    switch(type) {
        case 'select_user':
            return {
                title: 'Кому выдать?',
                modalSize: 500,
            }
    }
}