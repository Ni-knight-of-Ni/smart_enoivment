import React from 'react';

/**
 * App
 *
 * Simple react js fetch example
 */
class App extends React.Component {



    /**
     * constructor
     *
     * @object  @props  parent props
     * @object  @state  component state
     */
    constructor(props) {

        super(props);

        this.state = {
            items: [],
            isLoaded: false
        }
    }

    /**
     * componentDidMount
     *
     * Fetch json array of objects from given url and update state.
     */


    componentDidMount() {
            fetch('http://api.pathofexile.com/public-stash-tabs')
                .then(res =>  this.setState({
                        isLoaded: true,
                        items: res.data.items,
                    })
                );
        }


    /**
     * render
     *
     * Render UI
     */
    render() {

        const { isLoaded, items } = this.state;

        if (!isLoaded)
          return <div>Loading...</div>;

          return (
              <div className="App">
                  <ul>
                      {items.react.map(item => (
                          <li key={item.id}>
                              {item}
                          </li>
                      ))}
                  </ul>
              </div>
        );

    }

}

export default App;
