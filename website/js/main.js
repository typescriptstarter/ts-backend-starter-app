;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};




	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	var parallax = function() {

		if ( !isMobile.any() ) {
			$(window).stellar({
				horizontalScrolling: false,
				hideDistantElements: false, 
				responsive: true

			});
		}
	};


	$(function(){
		contentWayPoint();
		
		goToTop();
		loaderPage();
		parallax();
	});

	(async () => {

		const { data } = await axios.get('https://onchain.sv/api/v1/events?app=alpha.powco.dev&action=opened')
		let { events } = data

		console.log('EVENTS', events)

		const issues = events.filter(event => {

			return typeof event.content.issue?.url === 'string'

		})

		console.log("--issues--", issues)

		const pullRequests = events.filter(event => {

			return typeof event.content.pull_request?.url === 'string'

		})

		console.log("--pull requests--", pullRequests)

		for (let event of events) {

			console.log("ISSUE", event.content)
		}

		const templateHTML = document.getElementById('link-list-item-template').innerHTML

		const template = Handlebars.compile(templateHTML)

		events = issues.reverse().map(event => {

			try {
				var image_url = event.content.sender.avatar_url

				if (!image_url) {
					image_url = 'https://bitcoinfileserver.com/b474f7af07077b425ef6e72353b0fe8aa516754e816cac05c1734e6569b8d850'
				}

				const content = markdown.toHTML( event?.content?.issue?.body );
		
				return {
					timestamp: luxon.DateTime.fromISO(event.content.issue?.created_at).toLocaleString(luxon.DateTime.DATETIME_MED),
					title: event?.content?.issue?.url,
					content: event.content.content,
					href: event?.content?.issue?.html_url,
					content: content || event?.content?.issue?.body,
					txid: event.txid,
					image_url,
				}
			} catch(error) {
				console.error(error)
				return null
			}


		}).filter(event => !!event)

		for (let event of events) {

			const html = template(event)

			$('#homepage-links-list').prepend(html)

		}

		$('.boost-button').on('click', event => {

			event.preventDefault()

			console.log('target', event.target)

			const txid = $(event.target).parent('svg').data('txid')

			console.log('txid', txid)

			Snackbar.show({text: `Boosting Post with BoostPow.com for $0.05`, pos: 'bottom-right', actionTextColor: 'red'});

			handleBoost(txid)

		})

	})();


}());

function enqueueSnackbar(text, params) {

	Snackbar.show({text, pos: 'bottom-right', actionTextColor: 'red'});

}

const handleBoost = async (txid) => {

    const value = 0.05;
    const currency = 'USD';

    enqueueSnackbar(`Getting Boostpow Details for ${value} ${currency} of Proof of Work`, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    });

    const url = `https://askbitcoin.ai/api/v1/boostpow/${txid}/new?value=${value}&currency=${currency}`;

    console.log('boostpow.job.build', { url });

    let { data } = await axios.get(url);

    console.log('boostpow.payment_request', data);

    enqueueSnackbar(`Posting Boostpow Order: ${txid}`, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      variant: 'info'
    });

    const script = new bsv.Script(data.outputs[0].script);

    const amount = data.outputs[0].amount / 100000000;

    try {
      const send = {
        opReturn: [
          'onchain',
          '18pPQigu7j69ioDcUG9dACE1iAN9nCfowr',
          'job',
          JSON.stringify({
            index: 0
          })
        ],
        amount,
        to: script.toASM(),
        currency: 'BSV'
      };

      console.log('relayx.send.params', send);

      const result = await relayone.send(send);

      console.log('relayx.send.result', result);

      console.log('RESULT', result);

      const { txid } = result;

      console.log('TXID', txid);

      // Post the new boostpow job transaction to the indexer API at pow.co
      axios
        .get(`https://pow.co/api/v1/boost/jobs/${txid}`)
        .then(({ data }) => {
          console.log(`pow.co/api/v1/jobs/${result.txid}.result`, data);
         })
        .catch((error) => {
          console.error(`pow.co/api/v1/jobs/${result.txid}`, error);
        });

      axios
        .post(`https://pow.co/api/v1/boost/jobs`, {
          transaction: result.rawTx
        })
        .then(({ data }) => {
          console.log(`post.pow.co/api/v1/jobs.result`, data);
        })
        .catch((error) => {
          console.error(`post.pow.co/api/v1/jobs`, error);
        });

      enqueueSnackbar(`Boostpow Order Posted`, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        variant: 'success'
      });

      enqueueSnackbar(`boostpow.job ${result.txid}`, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        },
        persist: true
      });

      console.log('relay.quote', result);
    } catch (error) {
      console.error('relayx', error);

      enqueueSnackbar(`Error Posting Boostpow Order: ${error.message}`, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        variant: 'error'
      });
    }
}