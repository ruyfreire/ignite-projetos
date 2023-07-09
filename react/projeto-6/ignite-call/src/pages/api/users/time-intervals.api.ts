import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { z } from 'zod'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

const timeIntervalsData = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { intervals } = timeIntervalsData.parse(req.body)

  const createIntervals = intervals.map((interval) => {
    return prisma.userTimeInterval.create({
      data: {
        week_day: interval.weekDay,
        time_start_in_minutes: interval.startTimeInMinutes,
        time_end_in_minutes: interval.endTimeInMinutes,
        user_id: session.user.id,
      },
    })
  })

  await prisma.$transaction(createIntervals)

  return res.status(201).end()
}
