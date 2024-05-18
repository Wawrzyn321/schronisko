import styles from './GetInvolved.module.scss';

export function GetInvolved() {
    return <div className={styles['get-involved']}>
        <a className={styles['get-involved__panel']} href="/volunteering/dogs">Chcesz zapisać się na wolontariat?</a>
        <a className={styles['get-involved__panel']} href="/v-adoptions/how-to">Chcesz inaczej nam pomóc?</a>
    </div>
}