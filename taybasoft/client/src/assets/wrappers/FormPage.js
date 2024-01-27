import styled from "styled-components"

const Wrapper = styled.section`
	border-radius: var(--border-radius);
	width: 100%;
	background: var(--background-secondary-color);
	padding: 3rem 2rem 4rem;
	.form-title {
		margin-bottom: 2rem;
	}
	.form {
		margin: 0;
		border-radius: 0;
		box-shadow: none;
		padding: 0;
		max-width: 100%;
		width: 100%;
	}
	.form-row {
		margin-bottom: 0.3rem;
	}
	.form-center {
		display: grid;
		row-gap: 1rem;
		.form-row {
			margin-bottom: 0;
		}
	}
	.remove-confirmation {
		font-weight: 500;
	}

	.buttons-container {
		margin-top: 1rem;
		grid-column: 1 / -1;
		display: flex;
		align-items: end;
		justify-content: space-between;
	}

	@media (min-width: 992px) {
		padding-right: 10rem;
		padding-left: 10rem;
		.form-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
			column-gap: 1rem;
			.form-row {
				margin-bottom: 0;
			}
		}
	}
	@media (min-width: 1120px) {
		.form-center {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
`

export default Wrapper
