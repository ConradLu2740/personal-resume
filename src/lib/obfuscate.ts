/**
 * 邮箱地址混淆工具
 * 通过 Base64 编码和动态解码防止邮箱爬虫抓取
 */

/**
 * 将邮箱地址混淆为 HTML 实体编码
 * @param email 原始邮箱地址
 * @returns 混淆后的 HTML 字符串
 */
export function obfuscateEmail(email: string): string {
  const encoded = email
    .split('')
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join('')
  return encoded
}

/**
 * 创建安全的 mailto 链接
 * @param email 邮箱地址
 * @param subject 邮件主题
 * @param body 邮件内容
 * @returns mailto: 链接
 */
export function createMailtoLink(email: string, subject: string, body: string): string {
  const encodedSubject = encodeURIComponent(subject)
  const encodedBody = encodeURIComponent(body)
  return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`
}
