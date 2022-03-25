import React, { useRef, FC } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import { deleteIngredient, reduceCounter } from '../../services/actions/constructor-ingredients';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CellEmpty from '../cell-empty/cell-empty';
import styles from './topping-element.module.css';

type TContent = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  unId: number;
  __v: number;
  index: number;
};
interface IToppingElement {
  id: number;
  index: number;
  item: TContent;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}
const ToppingElement: FC<IToppingElement> = ({id, index, item, moveCard}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top)/2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset !== null) && clientOffset.y - hoverBoundingRect.top;
      if (hoverClientY !== null) {
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  function removeIngredient(item: TContent) {
    dispatch(deleteIngredient(item.unId));
    dispatch(reduceCounter(item));
  }

  return (
    <div ref={ref} style={{opacity}} className={styles.element} data-handler-id={handlerId}>
      <CellEmpty height="ml-4"/>
      <DragIcon type="primary"/>
      <CellEmpty height="ml-2"/>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => removeIngredient(item)}
      />
    </div>
  );
}

export default ToppingElement;
