class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: []
    };
  }

  onChangeHandle(event) {
    this.setState({searchText: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    const {searchText} = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({users: responseJson.items}));
  }

  render() {
    const divStyle = {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#E7EFF3',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px'
    };

    const headerStyle = {
      textTransform: 'uppercase',
      fontFamily: 'Arial',
      color: '#8097a5',
      fontSize: '20px',
      paddingBottom: '20px',
    };

    const formStyle = {
      backgroundColor: "#FF8F56",
      minWidth: '400px',
      padding: '50px',
      borderRadius: '5px',
      marginBottom: '15px',
      textAlign: 'center'
    };

    const labelStyle={
      fontFamily: 'Arial',
      fontSize: '18px',
      padding: '30px',
      color: '#fff',
      height: '15px',
      lineHeight: '15px'
    };

    const inputStyle = {
        border: 'none',
        padding: '10px',
        borderRadius: '3px',
        height: '15px'
    };

    document.body.style.backgroundColor = "#e7eff3";

    return (
      <div style={divStyle}>
        <h1 style={headerStyle}>user search on github</h1>
        <form style={formStyle} onSubmit={event => this.onSubmit(event)}>
          <label style={labelStyle} htmlFor="searchText">Search by user name</label>
          <input 
            style={inputStyle}
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}
            placeholder={"Enter user name"}/>
        </form>
        <UsersList users={this.state.users}/>
      </div>
    );
  }
}

class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user}/>);
  }

  render() {
    return (
      <div>
        {this.users}
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    const listStyle = {
      backgroundColor: '#8da5b3',
      minWidth: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '50px',
      borderRadius: '5px',
      marginBottom: '10px'
    };

    const aStyle = {
      color: '#fff',
      textDecoration: 'none',
      marginLeft: '15px'
    };


    return (
      <div style={listStyle}>
        <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
        <a style={aStyle} href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));