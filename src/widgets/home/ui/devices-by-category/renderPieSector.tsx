import { PieSectorShapeProps, Sector } from 'recharts';

import { categoryColors } from '../../model/constants';

export const renderPieSector = (props: PieSectorShapeProps) => {
  const category = props.payload.slug as keyof typeof categoryColors;

  return <Sector {...props} fill={categoryColors[category] ?? 'var(--gray-400)'} />;
};
