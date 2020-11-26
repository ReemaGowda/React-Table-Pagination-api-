import React, { Component } from "react";
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import axios from "axios";



class App extends Component {
  constructor(props) {
    super(props);
    //Initial data from API
    this.state = {
      data: []
    };
    axios.get("http://jsonplaceholder.typicode.com/photos?_limit=100 ", {
      // params: {
      //   _limit: 50
      //  }
    }).then(res => {
      // Update react-table
      console.log(res)
      this.setState({
        posts: res.data,
        data: res.data.slice(0, 5),
        pages: res.data.length / 5,
        loading: false
      });
    });
  }
  render() {
    const columns = [
      {
        Header: "AlbumId",
        accessor: "id",
        style: {
           textAlign: "right",
          color:'blue'
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Title",
        accessor: "title",
        style: {
          color: 'black',
          backgroundColor:'lightgrey'
       },
        sortable: false,
        filterable: false
      },
      {
        Header: "ThumbnailUrl",
        accessor: "thumbnailUrl",
        style: {
          color: 'black',
          backgroundColor:'lightgrey'
        },
        sortable: false,
        filterable: false
      },
      {
        Header: "Url",
        accessor: "url",
        style: {
          color: 'black',
         backgroundColor:'lightgrey'
        },
        sortable: false,
        filterable: false
      }
    ];
    return (
      <ReactTable
        columns={columns}
        data={this.state.data}
        pages={this.state.pages}
        loading={this.state.loading}
        filterable
        onPageChange={pageIndex => {
          let pagesize = 5;
          let low = pageIndex * pagesize;
          let high = pageIndex * pagesize + pagesize;
          axios.get("http://jsonplaceholder.typicode.com/photos?_limit=100").then(res => {
            // Update react-table
            this.setState({
              posts: res.data,
              data: res.data.slice(low, high),
              pages: res.data.pages,
              loading: false
            });
          });
        }}
        defaultPageSize={5}
        noDataText={"Loading..."}
        manual // informs React Table that you'll be handling sorting and pagination server-side
      />
    );
  }
}

export default App;
