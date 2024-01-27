import styled from "styled-components"

const Wrapper = styled.section`
	border-radius: var(--border-radius);
	background: var(--background-secondary-color);
	padding: 3rem 2rem 4rem;
	display: flex;
	flex-direction: column;
	.list-title {
		margin-bottom: 2rem;
	}
	.operations {
		display: flex;
		margin-bottom: 1rem;
	}
	.operation {
		display: flex;
		align-content: center;
	}

	@media (min-width: 992px) {
		.object-content {
			align-self: center;
		}
	}

	@media (min-width: 1120px) {
	}
`

export default Wrapper
