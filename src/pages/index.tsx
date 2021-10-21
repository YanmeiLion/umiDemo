import styles from './index.less';
import { Button } from 'antd';
import { Link, useDispatch } from 'umi'

export default function IndexPage(props:any) {
   const dispatch = useDispatch()
  const toHome = () => {
    // props.history.push('/home')
    // 派发数据
    dispatch({
      type: 'usersModel/getAllUser',
      payload: {
        size: ["XS", "S", "M", "ML"],
        filter: 'normal'
      }
    })
  }
  return (
    <div className={styles.main}>
      <Button type='primary' onClick={toHome}>前往首页</Button>
      <br/>
      <Button type='primary'> <Link to='/login'>去到登录界面</Link> </Button>
    </div>
  );
}
