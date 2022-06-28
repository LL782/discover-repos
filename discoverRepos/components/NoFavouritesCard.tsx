import styles from './NoFavouritesCard.module.css'

export const NoFavouritesCard = () => (
  <div className={styles.container}>
    <h2>No Favourites</h2>
    <p>
      You can select some from{' '}
      <strong className={styles.strong}>Trending</strong>
    </p>
  </div>
)
