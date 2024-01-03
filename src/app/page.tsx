import Footer from '@/components/global/footer';
import Header from '@/components/global/header';
import { UserEmailForm } from '@/components/pages/home/client';
import { Fragment } from 'react';

export default function Home() {
	return (
		<Fragment>
			<Header />
			<main>
				<section>
					<div className='sm:max-w-96 mx-[4%] sm:mx-auto py-8 sm:py-14 min-h-hvh'>
						<div>
							<h2 className='font-medium text-2xl'>Login</h2>
							<p className='text-muted-foreground text-sm mt-1 mb-4'>Try to type incorrect password</p>
							<UserEmailForm />
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</Fragment>
	);
}
