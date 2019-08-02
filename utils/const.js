export const BASE_URL = 'https://dev.km999.com'

export const RULES = {
	phone: v => v && /^1[\d]{10}$/.test(v)
}
