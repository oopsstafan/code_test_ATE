import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {saveMovieListAction} from '../redux/action_types'
import { connect } from 'react-redux'
import { Button, Card, Table, Input, Select, Form, message, Modal } from 'antd'
import {
  StarOutlined,
  StarFilled,
  ExclamationCircleOutlined
} from '@ant-design/icons'


import styles from '../styles/Home.module.scss'

const {confirm} = Modal
function Home({ data, setPageType, saveMovieList }) {
  const [movieList, setMovieList] = React.useState([])
  const [searchResult, setSearchResult] = React.useState([])
  const [isSearching, setIsSearching] = React.useState(false)
  React.useEffect(() => {
    setPageType('home')
    let localMovieList = JSON.parse(localStorage.getItem('localMovieList'))
    if (localMovieList) setMovieList(localMovieList)
    else {
      getInitList()
    }
    saveMovieList(data)
  }, [])
  const getInitList = ()=>{
    const newArr = data.map((movie) => {
      return { ...movie, fav: false }
    })
    setMovieList(newArr)
  }

  const handleSearch = async (e) => {
    setIsSearching(true)
    const result = movieList.find(movie=>{
      return movie.episode_id*1 === e.keyword*1 
      
    })
    setSearchResult([result])
  }
  const handleInpChange = (e)=>{
    if (!e.target.value){
      getInitList()
      setSearchResult([])
      setIsSearching(false)
    }
  }
  const handleFav = (movie) => {
    let newArr = (isSearching? searchResult: movieList).map((item) => {
      if (movie.episode_id === item.episode_id) {
        if (movie.fav) return { ...item, fav: false }
        else return { ...item, fav: true }
      } else return { ...item }
    })
    let favArr = newArr.filter(item=>item.fav)
    let nonfavArr = newArr.filter(item=>!item.fav)
    let finalArr = [...favArr, ...nonfavArr]
    console.log(finalArr)
    localStorage.setItem('localMovieList', JSON.stringify(finalArr))
    // setMovieList(finalArr)
    if (isSearching) setSearchResult(finalArr)
    setMovieList(finalArr)

  }

  const handleReset = ()=>{
    confirm({
      title: "Do you want to reset?",
      icon: <ExclamationCircleOutlined/>,
      content: "All favourite movies will be reset and localstorage will be cleared",
      onOk: ()=>{
        localStorage.clear()
        if (isSearching) {
          let result = searchResult.map(movie=>{
            return {...movie, fav: false}
          })
          setSearchResult(result)
        }
        getInitList()
        return
      },
      onCancel: ()=>{
        return
      }
    })
  }

  const dataSource = isSearching ? searchResult: movieList

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
      render: (movie) => { return <Button onClick={() => handleFav(movie)} type="link">{movie.fav ? <StarFilled /> : <StarOutlined />}</Button> }
    },
    {
      title: 'Operation',
      key: 'operation',
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
            <Form.Item name="keyword">
              <Input
                type="text"
                placeholder="keyword"
                style={{ width: 200 }}
                rules={[{ required: true, message: 'Please input your keyword!' }]}
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
            pagination={{
              pageSize: 5,
            }}
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

export default connect(
  state=>({}),
  {
    saveMovieList: saveMovieListAction
  }
)(Home)
