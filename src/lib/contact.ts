import { CONTACT } from './constants'

export function whatsappLink(message: string) {
  return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`
}

export function projectInquiry(title: string) {
  return whatsappLink(`Hola, GRUPO ARQSA. Vi el proyecto ${title} en su web y quisiera consultar por un proyecto similar.`)
}
