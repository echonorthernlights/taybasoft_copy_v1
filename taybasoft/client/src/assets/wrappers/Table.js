import styled from 'styled-components'

const Wrapper = styled.div`
	overflow-x: auto;
	overflow-y: hidden;
	.not-found-msg {
		color: var(--text-color);
		font-size: 1.5rem;
	}
	table {
		border-collapse: collapse;
		width: 100%;
	}
	table td,
	table th {
		border: 1px solid var(--table-border-color);
		padding: 8px;
		padding-top: 6px;
		padding-bottom: 6px;
		text-align: left;
		color: var(--text-color);
	}

	tr:nth-child(even) {
		background-color: var(--background-color);
	}

	table tr:hover {
		background-color: var(--table-backround-color-hover);
	}

	.pagination-container {
		display: flex;
		justify-content: end;
		column-gap: 0.3em;
		align-self: end;
	}

	.table-addons {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		margin: 0.3em 0px;
	}

	.filter-container {
		display: grid;
		grid-template-rows: auto;
		gap: 0.5rem;
	}

	.filter-row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.3rem;
	}

	.show-filters-btn {
		width: fit-content;
	}

	.operations-col {
		display: flex;
		align-items: center;
		justify-content: space-around;
		.edit-btn svg {
			color: var(--icon-edit-color);
		}
		.edit-btn svg:hover {
			width: 120%;
		}
		.delete-btn svg {
			color: red;
			width: 80%;
		}
		.delete-btn svg:hover {
			width: 100%;
		}
	}

	@media (min-width: 992px) {
		.show-filters-btn {
			width: fit-content;
		}
	}
`
export default Wrapper
