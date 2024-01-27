import addProduct from '../../../application/use_cases/product/add';
import productController from '../../../controllers/productController';
// import getAll from '../../../src/application/use_cases/product/getAll';

jest.mock('../../../application/use_cases/product/add');
jest.mock('../../../application/use_cases/product/getAll');

describe('productController', () => {
	let controller, mockProductDbRepository, mockProductRepository, mockLogger
	beforeEach(() => {
		mockProductRepository = jest.fn()
		mockProductDbRepository = jest.fn()
		mockLogger = {
			info: jest.fn(),
		}
		controller = productController(
			mockProductRepository,
			mockProductDbRepository,
			mockLogger
		)
	})
	afterEach(() => {
		jest.clearAllMocks()
	})
	it('should add a new product successfully', async () => {
		// Mocking the ProductEntity
		const mockProductEntity = {
			id: '1',
			title: 'Test Product',
			description: 'This is a test product',
			quantity: 10,
			price: 19.99,
		}

		// Mock request and response objects
		const mockReq = {
			body: {
				title: 'Test Product',
				description: 'This is a test product',
				quantity: 10,
				price: 19.99,
			},
		}
		const mockRes = {
			json: jest.fn(),
		}
		const mockNext = jest.fn()

		// Mock use case function that will be called inside the controller
		addProduct.mockResolvedValue(mockProductEntity)

		// Call the addNewProduct function
		await controller.addNewProduct(mockReq, mockRes, mockNext)

		// Assertions
		expect(mockProductRepository).toHaveBeenCalled()
		expect(mockProductDbRepository).toHaveBeenCalled()
		expect(mockLogger.info).toHaveBeenCalled()

		expect(mockRes.json).toHaveBeenCalledWith({
			msg: 'Product added successfully',
			product: mockProductEntity
		})
	})
})
