import styles from './Loader.module.scss'

const Loader = ({ width = 40, height = 40, color = '#ffffff', borderWidth = '5px', className = '' }) => {
  return <span
    className={`${styles.loader} ${className}`}
    style={{ width: `${width}px`, height: `${height}px`, borderColor: color, borderWidth }}></span>
}

export default Loader