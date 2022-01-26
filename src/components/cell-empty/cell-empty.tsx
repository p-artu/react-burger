import PropTypes from 'prop-types';

function CellEmpty(props: any) {
  return (
    <div className={props.height}></div>
  );
}

CellEmpty.propTypes = {
  height: PropTypes.string.isRequired
};

export default CellEmpty;
