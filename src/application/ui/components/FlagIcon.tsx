const TILE_H = 17;
const TILE_W = 28;
const countryOrder = [
  "AUT",
  "BLR",
  "CAN",
  "CHN",
  "FRA",
  "GER",
  "ITA",
  "NED",
  "NOR",
  "RUS",
  "SUI",
  "SWE",
  "USA",
] as const;

const SQUARE_COUNTRIES = ["SUI"];

type CountryCode = (typeof countryOrder)[number];

interface FlagIconProps {
  code: CountryCode;
}

export default function FlagIcon({ code }: FlagIconProps) {
  if (!countryOrder.includes(code)) return null;

  const idx = countryOrder.indexOf(code);
  const isSquare = SQUARE_COUNTRIES.includes(code);
  const horizontalCrop = Math.floor((TILE_W - TILE_H) / 2);
  const posY = -idx * TILE_H;
  const posX = isSquare ? -horizontalCrop : 0;

  return (
    <span
      role="img"
      aria-label={`${code} flag`}
      style={{
        display: "inline-block",
        backgroundImage: "url('/sprites/flags.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${posX}px ${posY}px`, // this is the whole reason why we're not using tailwind here
        width: isSquare ? TILE_H + 1 : TILE_W,
        height: TILE_H,
        margin: isSquare ? `0 ${horizontalCrop}px` : undefined,
      }}
    />
  );
}
