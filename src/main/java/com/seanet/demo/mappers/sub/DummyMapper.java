package com.seanet.demo.mappers.sub;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DummyMapper {

    Integer findLatestTelegraphOrder();

}
