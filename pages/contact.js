import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '../public/text/brand';
import ContactFrm from '../components/Forms/Contact';

function Contact() {
	return (
		<Fragment>
			<Head>
				<title>
					{brand.dassplastic.name}
					&nbsp; - Contact
				</title>
			</Head>
			<div>
				<ContactFrm />
			</div>
		</Fragment>
	);
}

Contact.getInitialProps = async () => ({
	namespacesRequired: ['common'],
});

export default Contact;
