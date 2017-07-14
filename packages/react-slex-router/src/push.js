import router from 'slex-router'

export default function push ({ path, extras }) {
  return router.push({ path, extras })
}
