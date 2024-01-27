import styled from "styled-components"

const Wrapper = styled.div`
	padding: 0 5%;
	border-radius: var(--border-radius);
	background: var(--background-secondary-color);

	.details-container {
		display: flex;
		flex-direction: column;
	}
	@media (min-width: 1200px) {
		.details-container {
			flex-direction: row;
		}
	}
`

export default Wrapper
