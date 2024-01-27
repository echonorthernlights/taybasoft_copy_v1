import styled from 'styled-components'

const Wrapper = styled.section`
	.main {
		display: grid;
		grid-template-columns: 1fr;
	}
	.main-page {
		width: 90vw;
		margin: 0 auto;
		padding: 2rem 0;
	}
	@media (min-width: 992px) {
		.main {
			grid-template-columns: auto 1fr;
		}
		.main-page {
			width: 90%;
		}
	}
`
export default Wrapper
