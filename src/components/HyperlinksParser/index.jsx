import React, { Component } from 'react';
import Form from './Form';
import Table from './Table';

class HyperlinksParser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      htmlText: '',
      isFetching: false,
    };
  }

  loadHtmlText = url => {
    return fetch(url, {
      method: 'GET',
      'Content-type': 'text/html',
    })
      .then(response => response.text())
      .then(data => {
        this.setState({
          htmlText: data,
        });
      })
      .catch(error => {
        this.setState({
          error,
        });
      });
  };

  handleSubmit = ({ values: { url } }) => {
    this.loadHtmlText(url);
  };

  render() {
    const { htmlText } = this.state;
    return (
      <article>
        <Form onSubmit={this.handleSubmit} />
        <section>
          <Table htmlText={htmlText} />
        </section>
      </article>
    );
  }
}

export default HyperlinksParser;
