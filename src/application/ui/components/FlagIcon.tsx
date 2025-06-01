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

type CountryCode = (typeof countryOrder)[number];

interface FlagIconProps {
  code: CountryCode;
}

export default function FlagIcon({ code }: FlagIconProps) {
  if (!countryOrder.includes(code)) return null;

  const idx = countryOrder.indexOf(code);
  const posY = -idx * TILE_H;

  return (
    <span
      role="img"
      aria-label={`${code} flag`}
      style={{
        display: "inline-block",
        backgroundImage: "url('/sprites/flags.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `0px ${posY}px`,
        width: TILE_W,
        height: TILE_H,
      }}
    />
  );
}
