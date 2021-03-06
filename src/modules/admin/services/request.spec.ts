import { NotFoundException } from '@nestjs/common';
import { IRequest } from 'modules/database/interfaces/request';

import { RequestRepository } from '../repositories/request';
import { RequestService } from './request';

/* eslint-disable max-len */
describe('Admin/RequestService', () => {
  let requestRepository: RequestRepository;
  let service: RequestService;

  const request: IRequest = {
    description: 'requestDescription',
    quantity: 1
  };

  beforeEach(async () => {
    requestRepository = new RequestRepository();

    service = new RequestService(requestRepository);
  });

  it('should create a request', async () => {
    jest.spyOn(requestRepository, 'insert').mockImplementationOnce(request => Promise.resolve({ ...request } as any));

    const result = await service.save(request);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(request);
  });

  it('should update a request', async () => {
    jest.spyOn(requestRepository, 'findById').mockResolvedValueOnce({ id: 2 } as any);
    jest.spyOn(requestRepository, 'update').mockImplementationOnce(request => Promise.resolve({ ...request } as any));

    const result = await service.save({ id: 1, ...request });

    expect(result).not.toBeFalsy();
    expect(result).toEqual({ id: 1, ...request });
  });

  it('should throw NotFoundException when try update a not found request', async () => {
    jest.spyOn(requestRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.save({ id: 1, ...request });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should remove a request', async () => {
    jest.spyOn(requestRepository, 'findById').mockResolvedValueOnce({ id: 2 } as any);
    jest.spyOn(requestRepository, 'remove').mockResolvedValueOnce({ id: 2 } as any);

    await service.remove(2);
  });

  it('should throw NotFoundException when try to remove a not found request', async () => {
    jest.spyOn(requestRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.remove(2);
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
