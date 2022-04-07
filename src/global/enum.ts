export enum ParModelParams {
  name = "name",
  area = "area",
  description = "description",
  type = "type",
  DEMfile = "DEMfile", // DEM文件的路径
  riverwidth = "riverwidth",
  riverheight = "riverheight",
  riverelevation = "riverelevation",
  infiltration = "infiltration", // 模拟区域范围内统一的下渗速度，单位 m/s
  fpfric = "fpfric", // 模拟区域范围内统一的曼宁糙率，无量纲
  manningfile = "manningfile", // 曼宁糙率数据文件路径(优先级高于fpfric)

  stagefile = "stagefile", // 监测点文件路径
  inp_file = "inp_file", // SWMM5工程文件路径(耦合功能)
  /** 以下参数为默认/不暴露
  dirroot = "dirroot", // 结果输出目录的路径
  resroot = "resroot", // 结果文件名的前缀
  uniform_rules = "uniform_rules", // 耦合计算使用的排涝和溢流量规则的信息文件。
  swmm_output = "swmm_output", // 保存SWMM5的计算结果*.out和*.rpt文件
  threads = "threads", // OpenMP并行计算时使用的线程数(默认使用机器最大线程数)
  qoutput = "qoutput", // 输出流量结果
  voutput = "voutput", // 输出流速结果
  g = "g", // 重力加速度
  elevoff = "elevoff", // 不输出水位结果
  adaptoff = "adaptoff", // 固定步长
   */
}

export enum ParSimulateParams {
  modelID = "modelID",
  mode = "mode", // 模型计算模式
  rainfall = "rainfall", // 时序降雨输入文件路径
  dynamic_rain_file = "dynamic_rain_file", // NetCDF 格式的降雨输入文件路径
  sim_time = "sim_time", // 模拟内涝事件的总时间
  start_date = "start_date", // 模拟时间开始日期
  start_time = "start_time", // 模拟时间开始时刻
  end_date = "end_date", // 模拟时间结束日期
  end_time = "end_time", // 模拟时间结束时刻
  initial_tstep = "initial_tstep", // 初始时间步长，单位s，默认为10.0
  saveint = "saveint", // 保存一次水深、流速、流量等结果的时间间隔，单位s
  massint = "massint", // 水体质量平衡检查的时间间隔，单位 s
  cfl = "cfl", // 水动力计算时间步长安全系数(默认0.7)
  evaporation = "evaporation", // 时序蒸发速度信息文件路径
  depththresh = "depththresh", // 开始进行水动力计算的水位差阈值，单位 m，默认值为 0.1
}

export enum InpBuildParams {
  Infiltration = "Infiltration",
  FlowType = "FlowType",
  MinSlope = "MinSlope",
  StepRegulation = "StepRegulation",
  ModelName = "ModelName",
  ConduitID = "ConduitID",
  JunctionID = "JunctionID",
  OutfallID = "OutfallID",
  ConduitMatch = "ConduitMatch",
  JunctionMatch = "JunctionMatch",
  OutfallMatch = "OutfallMatch",
}

export enum InpJunction {
  Name = "Name",
  Invert_Elev = "Invert Elev",
  Depth = "Depth",
  Initial_Depth = "Initial Depth",
  Surcharge_Depth = "Surcharge Depth",
  Ponded_Area = "Ponded Area",

  Description = "Description",
  Tag = "Tag",
  Baseline = "Baseline",
  Basline_Pattern = "Basline Pattern",
  Time_Series = "Time Series",
  Scale_Factor = "Scale Factor",
  Average_Value = "Average Value",
  Time_Pattern1 = "Time Pattern1",
  Time_Pattern2 = "Time Pattern2",
  Time_Pattern3 = "Time Pattern3",
  Time_Pattern4 = "Time Pattern4",
  Hydrograph = "Hydrograph",
  Sewered_Area = "Sewered Area",
  Rim_Elev = "Rim Elev",
}

export enum InpOutfall {
  Name = "Name",
  Invert_Elev = "Invert Elev",
  Type = "Type",
  Time_Series = "Time Series",
  Tide_Gate = "Tide Gate",

  Description = "Description",
  Tag = "Tag",
  Fixed_Stage = "Fixed Stage",
  Curve_Name = "Curve Name",
  Series_Name = "Series Name",
  Baseline = "Baseline",
  Baseline_Pattern = "Baseline Pattern",
  Scale_Factor = "Scale Factor",
  Average_Value = "Average Value",
  Time_Pattern1 = "Time Pattern1",
  Time_Pattern2 = "Time Pattern2",
  Time_Pattern3 = "Time Pattern3",
  Time_Pattern4 = "Time Pattern4",
  Hydrograph = "Hydrograph",
  Sewershed_Area = "Sewershed Area",
  Rim_Elev = "Rim Elev",
}

export enum InpConduit {
  Name = "Name",
  Inlet_Node = "Inlet Node",
  Outlet_Node = "Outlet Node",
  Length = "Length",
  Roughness = "Roughness",
  Cross_Section = "Cross Section",
  Geom1 = "Geom1",
  Geom2 = "Geom2",
  Geom3 = "Geom3",
  Geom4 = "Geom4",
  Inlet_Offset = "Inlet Offset",
  Outlet_Offset = "Outlet Offset",
  Initial_Flow = "Initial Flow",
  Flow_Limit = "Flow Limit",
  Barrels = "Barrels",

  Description = "Description",
  Tag = "Tag",
  Entry_Loss_Coeff = "Entry Loss Coeff",
  Exit_Loss_Coeff = "Exit Loss Coeff",
  Avg_Loss_Coeff = "Avg Loss Coeff",
  Flap_Gate = "Flap Gate",
  Transect = "Transect",
  Shape_Curve = "Shape Curve",
  Culvert_Code = "Culvert Code",
  Slope = "Slope",
}
