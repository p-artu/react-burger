import { useDrop } from "react-dnd";
import { useDispatch } from '../../services/hooks';
import { addIngredient, increaseCounter } from '../../services/actions/constructor-ingredients';
import styles from './empty-burger-ingredients.module.css';
import { TIngredient } from '../../utils/types';

function EmptyBurgerIngredients() {
  const dispatch = useDispatch();
  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      let uniqueItem: TIngredient = {...item};
      if (uniqueItem.type !== 'bun') {
        const now = new Date().getTime();
        uniqueItem.unId = now;
      }
      dispatch(addIngredient(uniqueItem));
      if (uniqueItem.type !== 'bun') {
        dispatch(increaseCounter(uniqueItem));
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });
  const borderColor = isHover ? 'red' : '';

  return (
    <div style={{borderColor}} ref={dropTarget} className={styles.container}>
      <p className="text text_type_main-default text_color_inactive">Добавьте ингредиенты</p>
    </div>
  );
}

export default EmptyBurgerIngredients;
