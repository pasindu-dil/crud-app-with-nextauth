import { getServerSession } from "next-auth/next"
import { nextAuthOptions } from "@/shared/lib/next-auth"

const handler = async (req, res) => {
  const session = await getServerSession(req, res, nextAuthOptions)
  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}

export default handler