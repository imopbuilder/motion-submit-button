import Header from '@/components/global/header';
import { UserEmailForm } from '@/components/pages/home/client';
import { Fragment } from 'react';

export default function Home() {
	return (
		<Fragment>
			<Header />
			<main>
				<section>
					<div className='max-w-96 mx-auto py-14'>
						<UserEmailForm />
					</div>
				</section>
			</main>
		</Fragment>
	);
}
