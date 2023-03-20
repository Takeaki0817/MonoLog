import Link from 'next/link';

const Page = () => {
	return (
		<div className='max-w-4xl mx-auto px-4'>
			<div className='h-screen pt-20'>
				<h1 className='text-3xl leading-10 tracking-wide font-bold text-center'>
					ひとりごとのように
					<br />
					思考を整理する
				</h1>
				<p className='text-lg leading-8 tracking-wide mt-8'>
					頭の中に渦巻く、ごちゃっとしたものを叩き出す。
					<br />
					不満や愚痴からアイデアまで、あらゆる思いつきをブラッシュアップすることができます。
				</p>

				<div className='mt-5'>
					<Link
						href={'/signup'}
						className='w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
					>
						アカウント登録して始める
					</Link>
					<p className='mt-2'>
						<small>
							※現在はプロトタイプ版です。入力したデータが消える可能性があるため、本格使用は控えてください。
						</small>
					</p>
				</div>
			</div>

			<section className='py-20 border-t border-gray-300'>
				<h2 className='text-2xl font-bold'>## MonoLogについて</h2>
				<div className='mt-6 text-base tracking-wide'>
					<p>
						ひとりごと型思考整理アプリMonoLogは、
						<strong className='font-bold'>
							メモよりもテキトーに、ひとりごとよりもシンプルに
						</strong>
						をコンセプトに作られたアプリケーションです。
					</p>
					<p className='mt-4'>
						製作者は、自分の思考を整理するのに、よく「チャットアプリに思いついたことを乱雑に書き出す」ということをやっていました。
						<br />
						この方法で、現状に対する不安や不満・愚痴から始まり、そこに対する解決策や為すべき行動を見つけたり、一つのテーマに対してブレインストーミングを一人で行ったりしてきました。
					</p>
					<p className='mt-4'>
						しかし、チャットアプリだと流れてしまったり、要点を見返しずらかったりなどのデメリットもあり、記録することに特化したメモアプリだと綺麗に書こうとして思考の経過が残しずらい。
						<br />
						そこで、生まれたのがMonoLogです。
					</p>
					<p className='mt-4'>
						MonoLogは、「ひとりごと」を意味する「monolog（モノローグ）」に、「記録」を意味する「log（ログ）」の意味を強調したプロダクト名となっています。
					</p>
					<p className='mt-4'>
						完成したら自分が一番使いたいアプリケーションを作成しました。
					</p>
				</div>
			</section>

			<section className='py-20 border-t border-gray-300'>
				<h2 className='text-2xl font-bold'>## MonoLogの使い方</h2>
				<div className='mt-6 text-base tracking-wide'>
					<p>このアプリは、主に次の二つの画面で構成されています。</p>
					<ul className='list-disc ml-6 mt-2'>
						<li>トピック一覧ページ</li>
						<li>ひとりごとページ</li>
					</ul>

					<h3 className='text-xl font-bold mt-6'>
						### トピック一覧ページの使い方
					</h3>
					<p className='mt-4'>考えたいこと毎に部屋を分けることができます。</p>
					<p className='mt-4'>
						「トピック名」の箇所で考えたいことを入力し、部屋を作成します。
						<br />
						部屋を作成したら、作成した部屋に入り、乱雑に思いのまま入力していきましょう！
					</p>
					<p className='mt-4'>
						未実装の機能が多いため、下記の「今後の追加予定の機能」を確認してください。
					</p>

					<h3 className='text-xl font-bold mt-6'>
						### ひとりごとページの使い方
					</h3>
					<p className='mt-4'></p>

					<p className='mt-4'>
						未実装の機能が多いため、下記の「今後の追加予定の機能」を確認してください。
					</p>
				</div>
			</section>

			<section className='py-20 border-t border-gray-300'>
				<h2 className='text-2xl font-bold'>今後の追加予定の機能</h2>
				<div className='mt-6 text-base tracking-wide'>
					<h3 className='text-xl font-bold mt-6'>### トピック一覧ページ</h3>
					<ul className='list-disc ml-6 mt-2'>
						<li>トピック名を変更できる機能を実装します。</li>
						<li>トピックを削除・アーカイブする機能を実装します。</li>
						<li>トピックの並び順を新着順以外にする方法を実装します。</li>
						<li>トピック毎にアイコンを設置する機能を実装します。</li>
						<li>トピックとその内容を検索する機能を実装します。</li>
					</ul>

					<h3 className='text-xl font-bold mt-6'>
						### ひとりごとページの使い方
					</h3>
					<ul className='list-disc ml-6 mt-2'>
						<li>テキストを改行できる仕様にします。</li>
						<li>ひとりごとを削除・アーカイブする機能を実装します。</li>
						<li>トピック名を変更できる機能を実装します。</li>
						<li>
							ひとりごとに要点を見返しやすいように「役割」を与える機能を実装します。
						</li>
						<li>ひとりごとの並び順を新着順以外にする方法を実装します。</li>
						<li>部屋の中のひとりごとを検索する機能を実装します。</li>
						<li>ChatGPTに関する機能を実装したいです。</li>
					</ul>
				</div>
			</section>

			<section className='py-20 border-t border-gray-300'>
				<h2 className='text-2xl font-bold'>## ご連絡先</h2>
				<div className='mt-6 text-base tracking-wide'>
					<p>
						→ Twitter:{' '}
						<a
							href='https://twitter.com/dev_takeaki0817'
							target='_blank'
							rel='noopener noreferrer'
							className=' text-blue-600'
						>
							@dev_takeaki0817
						</a>
					</p>
					<p>
						→ GitHub:{' '}
						<a
							href='https://github.com/Takeaki0817'
							target='_blank'
							rel='noopener noreferrer'
							className=' text-blue-600'
						>
							Takeaki0817
						</a>
					</p>
					<p className='mt-4'>
						バグの報告やその他連絡はこちらまでお願いします。
					</p>
				</div>
			</section>
		</div>
	);
};

export default Page;
