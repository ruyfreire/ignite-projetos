export interface Coordinate {
  latitude: number
  longitude: number
}

export type GetDistanceBetweenCoordinateProps = {
  from: Coordinate
  to: Coordinate
}

export abstract class Localization {
  abstract getDistanceBetweenCoordinate(
    props: GetDistanceBetweenCoordinateProps,
  ): number
}
