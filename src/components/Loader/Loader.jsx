import styles from './Loader.module.scss'

const Loader = ({ width = 40, height = 40, color = '#ffffff', borderWidth = '5px', className = '' }) => {
  return (
    <div
      className={`${styles.loaderWrapper} ${className}`}
      style={{ width: `${width}px`, height: `${height}px`, }}>
      <span
        className={styles.loader}
        style={{ borderColor: color, borderWidth }}></span>
    </div>
  )
}

export default Loader