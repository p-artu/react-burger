import { FC } from 'react';

interface ICellEmpty {
  height: string;
}
const CellEmpty: FC<ICellEmpty> = ({height}) => {
  return (
    <div className={height}></div>
  );
}

export default CellEmpty;
