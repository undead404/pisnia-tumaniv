export default function cleanNonTelling(str: string) {
  const result = str.replace(/[^a-zA-Z\u0400-\u04FF0-9 -]/g, "").trim();
  //console.log(str, '->', result)
  return result
}
