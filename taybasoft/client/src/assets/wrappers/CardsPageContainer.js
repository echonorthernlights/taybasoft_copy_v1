import styled from "styled-components"

const Wrapper = styled.section`
	width: 100%;
	border-radius: var(--border-radius);
	background: var(--background-secondary-color);
	padding: 1rem 1rem;

	.title {
		text-align: center;
		margin-bottom: 2rem;
	}
	.operations {
		display: flex;
		margin-bottom: 1.5rem;
		margin-left: 1rem;
	}
	.operation {
		display: flex;
		align-content: center;
	}
	.cards-container {
		display: grid;
		row-gap: 2rem;
		justify-items: center;
	}

	@media (min-width: 768px) {
		.cards-container {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 1120px) {
		.cards-container {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
`
export default Wrapper
