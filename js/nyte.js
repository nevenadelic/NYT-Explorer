class App extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            data: [],
            selectedArticle: {
    id: '',
    headline: '',
                snippet: '',
                word_count: '',
                pub_date: '',
                web_url: ''
            }
        };

        this.setData = this.setData.bind(this);
        this.handleArticleClick = this.handleArticleClick.bind(this);
    }

    handleArticleClick(item){
        this.setState({selectedArticle: item})
    }

    setData(newData){
let article = [];
for(var i = 0; i < 20; i++) {
const doc = newData.response.docs[i];
article.push(doc);
}
console.log(newData);
        this.setState({data: article});
    }

    componentDidMount(){
$.ajax({
      url: 'https://api.nytimes.com/svc/archive/v1/' +  document.getElementById('year').value + '/' + document.getElementById('month').value + '.json',
      method: 'GET',
      data: {
          'api-key': "9b98b8d3102b4c98b7c14e81de2e368e"
      },
      success: this.setData
});
}

    render(){
        return (
            <div className="page">
                <div className="master">
                    <ArticleResults
                        selectionHandler={this.handleArticleClick}
                        data={this.state.data}/>
                </div>
                <div className="details">
                    <ArticleDetails
                        artc={this.state.selectedArticle}/>
                </div>
            </div>
        );
    }

}

const ArticleDetails = (props) => {
    const artc = props.artc;

    return (
        <div>
            <ul>
    <h1>{artc.headline.main}</h1>
                <li>ID: {artc._id}</li>
                <p>Preview: {artc.snippet}</p>
    <li>Word count:{artc.word_count}</li>
                <li>Pub date: {artc.pub_date}</li>
                <li>Url: {artc.web_url}</li>
            </ul>
        </div>
    );
}

class Article extends React.Component{

    render(){
        const artBlock = this.props.item;
        const clickHandler = this.props.clickHandler;
        const multimedia = artBlock.multimedia;
        const picurl = multimedia[2];
        if (picurl != null){
        console.log(picurl);
        const pic = 'https://www.nytimes.com/' + picurl.url;
        const block =
            <div className='card' onClick={() => clickHandler(artBlock)}>
  <div><img id="img11" className='picture' src={pic} alt="NYT logo"/>
  </div>
            {artBlock.headline.main}
            </div>;

        return block;
      }
      else {
        const block =
            <div className='card' onClick={() => clickHandler(artBlock)}>
  <div><img id="img11" className='picture' src="logo.jpg" alt="NYT logo"/>
  </div>
            {artBlock.headline.main}
            </div>;

        return block;
      }
    }
}

class ArticleResults extends React.Component {

    render() {
        const articles = this.props.data;

        const grid =
            <div className='previews'>
                    {
                        articles.map(
                            (artc, index) => <Article
                                key={index}
                                item={artc}
                                clickHandler={this.props.selectionHandler} />
                        )
                    }
            </div>;
         return grid;
    }
}

function find(){
const root = document.getElementById('root');
ReactDOM.render(<App />,  root);
}
