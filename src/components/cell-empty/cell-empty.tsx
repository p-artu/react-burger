import { FC } from 'react';
import { ICellEmpty } from '../../utils/types';

const CellEmpty: FC<ICellEmpty> = ({height}) => {
  return (
    <div className={height}></div>
  );
}

export default CellEmpty;
