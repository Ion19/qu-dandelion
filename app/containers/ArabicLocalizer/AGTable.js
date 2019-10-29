import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock ,DateWidget    } from 'dan-components';
import AgTable from '../../components/AgTableSS';

class AGTable extends React.Component {
  render() {
    const title = 'Dandelion Pro. Blank Page';
    const description = 'Dandelion Pro';
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Ag-Table" desc="Server Side Data Table">
         <div>
         
           </div> 
           
          <AgTable/>
        </PapperBlock>
      </div>
    );
  }
}

export default AGTable;