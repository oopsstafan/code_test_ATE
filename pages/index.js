import React from 'react'

import Link from 'next/link'
import { Button, Card, Table, Input, Form, message, Modal } from 'antd'
import {
  StarOutlined,
  StarFilled,
  ExclamationCircleOutlined
} from '@ant-design/icons'


import styles from '../styles/Home.module.scss'

const { confirm } = Modal
//This is home page
function Home({ data, setPageType }) {
  //movieList is used for store the info that showing on page
  const [movieList, setMovieList] = React.useState([])
  //allMovieList is used for store all movie info with updated "favourite" info
  const [allMovieList, setAllMovieList] = React.useState([])
  React.useEffect(() => {
    setPageType('home')
    //read the localstorage 
    let localMovieList = JSON.parse(localStorage.getItem('localMovieList'))
    //If there is localstorage, set movieList and all movieList so that page can properly show info even when user refresh page
    if (localMovieList) {
      setMovieList(localMovieList)
      setAllMovieList(localMovieList)
    } else {

      //if no localstorage, init page and get new movie info list
      getInitList()
    }
  }, [])
  //init movie list, get movie list from API
  const getInitList = () => {
    const newArr = data.map((movie) => {
      return { ...movie, fav: false }
    })
    setMovieList(newArr)
    setAllMovieList(newArr)
  }
  //handle list search
  const handleSearch = async (e) => {
    const result = movieList.find(movie => {
      return movie.episode_id * 1 === e.keyword * 1

    })
    //set new movie list so UI can update properly
    setMovieList([result])
  }
  //handle users reset the search input
  const handleInpChange = (e) => {
    if (!e.target.value) {
      setMovieList([...allMovieList])
    }
  }
  //handle user update favourite info
  const handleFav = (movie) => {
    //update the movieList and allMovieList and make sure they store the updated movie info
    let newArr = movieList.map((item) => {
      if (movie.episode_id === item.episode_id) {
        if (movie.fav) return { ...item, fav: false }
        else return { ...item, fav: true }
      } else return { ...item }
    })
    let newArrAll = allMovieList.map((item) => {
      if (movie.episode_id === item.episode_id) {
        if (movie.fav) return { ...item, fav: false }
        else return { ...item, fav: true }
      } else return { ...item }
    })
    let favArr = newArr.filter(item => item.fav)
    let nonfavArr = newArr.filter(item => !item.fav)
    let finalArr = [...favArr, ...nonfavArr]
    
    let favArrAll = newArrAll.filter(item => item.fav)
    let nonfavArrAll = newArrAll.filter(item => !item.fav)
    let finalArrAll = [...favArrAll, ...nonfavArrAll]
    /*
      store all the updated info(favourite info included) to localstorage so that 
      info won't lost if user refresh the page
    */
    localStorage.setItem('localMovieList', JSON.stringify(finalArrAll))
    setMovieList(finalArr)
    setAllMovieList(finalArrAll)

  }
  //reset all the favourite status.
  const handleReset = () => {
    confirm({
      title: "Do you want to reset?",
      icon: <ExclamationCircleOutlined />,
      content: "All favourite movies will be reset and localstorage will be cleared",
      onOk: () => {
        //clear localstorage
        localStorage.clear()
        //re-init and reset the movieList
        getInitList()
        return
      },
      onCancel: () => {
        return
      }
    })
  }
  
  //show movieList state on the page
  const dataSource = movieList

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '30%'
    },
    {
      title: 'Director',
      dataIndex: 'director',
      key: 'director',
    },
    {
      title: 'Release Date',
      dataIndex: 'release_date',
      key: 'release_date',
    },
    {
      title: 'Episode Id',
      dataIndex: 'episode_id',
      key: 'episode_id',
    },
    {
      title: 'Favourite',
      // dataIndex: 'release_date',
      key: 'favourite',
      width: '5%',
      render: (movie) => { return <Button onClick={() => handleFav(movie)} type="link">{movie.fav ? <StarFilled /> : <StarOutlined />}</Button> }
    },
    {
      title: 'Operation',
      key: 'operation',
      width: '5%',
      render: (movie) => {
        const deatilPath = '/detail/' + movie.episode_id
        return <Link href={deatilPath}>Details</Link>
      }
    },
  ];


  return (

    <main className={styles.main_wrapper}>
      <Card
        title={<Form
          name="searchForm"
          layout="inline"
          onFinish={handleSearch}

        >
          <Form.Item
            name="keyword"
            rules={[
              {
                required: true, message: 'Please input your keyword!'
              },
              {
                pattern: /^[1-6]\d*$/,
                message: "Episode must from 1-6 and ingeter"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="Search by Episode ID"
              style={{ width: 200 }}
              allowClear
              onChange={handleInpChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>}
        style={{ width: '100%', height: '100%' }}
        extra={<Button onClick={handleReset} type="primary">Reset Favourite</Button>}
      >
        <Table dataSource={dataSource}
          columns={columns}
          rowKey="episode_id"
          bordered={false}
          style={{ height: 1000 }}
          pagination={false}
        />
      </Card>
    </main>

  )
}

export const getStaticProps = async (context) => {
  const data = await fetch('https://swapi.dev/api/films').
    then(res => res.json())
  return {
    props: {
      data: data.results
    }
  }
}

export default Home
