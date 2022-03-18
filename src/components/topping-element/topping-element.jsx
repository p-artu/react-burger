import { useRef } from 'react';
import PropTypes from 'prop-types';
import { uniqueIngredientPropTypes } from '../../utils/types';
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import { deleteIngredient, reduceCounter } from '../../services/actions/constructor-ingredients';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CellEmpty from '../cell-empty/cell-empty';
import styles from './topping-element.module.css';

function ToppingElement(props) {
  const {id, index, item, moveCard} = props;
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
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

  function removeIngredient(item) {
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

ToppingElement.propTypes = {
  item: uniqueIngredientPropTypes.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired
};

export default ToppingElement;
