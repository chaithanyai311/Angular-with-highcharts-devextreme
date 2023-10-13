import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    AbstractAppSettings,
    CommonToolbarService,
    ControlHelperService,
    DialogService,
    HttpService,
    IColumnSelectionChanges,
    ICommonColumnSelection,
    ILibraryEntry,
    IPlugin,
    LocalizationService,
    PluginsService,
    ResourcesService,
    SnackBarService,
} from '@stars-enterprise/common-core';
import { IResourceType, Query } from '@stars-enterprise/model';
import { MainSelectionService } from '../../services/main-selection.service';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { MainComponent } from './main.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
/* eslint-disable @typescript-eslint/no-explicit-any */
describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;
    let httpService: HttpService;
    let pluginsService: PluginsService;
    let mainSelectionService: MainSelectionService;
    let snackBarService: SnackBarService;
    const numberOfTypesToQuery = 4;
    const numberOfItemsToDisplay = 3;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MainComponent],
            providers: [
                { provide: AbstractAppSettings, useValue: getMockService() },
                { provide: HttpService, useValue: getMockService().httpService },
                { provide: CommonToolbarService, useValue: getMockService() },
                { provide: SnackBarService, useValue: getMockService().snackBarService },
                { provide: DialogService, useValue: getMockService() },
                { provide: ResourcesService, useValue: getMockService() },
                { provide: LocalizationService, useValue: getMockService() },
                { provide: ControlHelperService, useValue: getMockService() },
                { provide: PluginsService, useValue: getMockService().pluginsService },
                { provide: MainSelectionService, useValue: getMockService().mainSelectionService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        httpService = TestBed.inject(HttpService);
        pluginsService = TestBed.inject(PluginsService);
        // Provided in component providers: [MainSelectionService, { provide: AbstractCommonColumnSelectionService, useExisting: MainSelectionService }],
        mainSelectionService = component['mainSelectionService'];
        snackBarService = TestBed.inject(SnackBarService);    
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
    describe('onInit', () => {
        it('request appropriate data', () => {
            spyOn<any>(httpService, 'get$').and.callThrough();
            component.ngOnInit();
            expect(httpService.get$).toHaveBeenCalledTimes(1);
            expect(httpService.get$).toHaveBeenCalledWith(
                '/data/v1/service/api/types?properties={"Name":1,"DisplayName":1,"Description":1,"AllowedOperations":1,"Properties":1,"EnumDeclarations":1,"TypeDeclarations":1}&limit=4&where={"$and":[{"$or":[{"Name":"StarsEnterprise.Example.Vehicle"},{"Name":"StarsEnterprise.Example.Fuel"},{"Name":"StarsEnterprise.GasBottles.Bottle"},{"Name":"StarsEnterprise.Examples.Person"}]}]}');
        });
        it('set library entries', () => {
            spyOn<any>(httpService, 'get$').and.callFake(() => {
                return of({ TypeInfos: [{}, {}] });
            });
            spyOn<any>(component, 'toLibraryEntity').and.returnValue({});
            component.ngOnInit();
            expect(component.libraryEntities).toEqual([{} as ILibraryEntry, {} as ILibraryEntry]);
            expect(component['toLibraryEntity']).toHaveBeenCalledTimes(2);
        });
        it('call configureBaseToolbar', () => {
            spyOn<any>(component, 'configureBaseToolbar').and.callThrough();
            component.ngOnInit();
            expect(component['configureBaseToolbar']).toHaveBeenCalledTimes(1);
        });
    });
    describe('onLibrarySelection', () => {
        it('should set selected type', () => {
            spyOn<any>(component, 'getType').and.callFake(() => {});
            spyOn<any>(component, 'getPlugins').and.callFake(() => {});
            spyOn<any>(component, 'getInstances').and.callFake(() => {});
            spyOn<any>(component, 'resetSidebars').and.callFake(() => {});

            component.onLibrarySelection(libraryTypeA());
            expect(component.selectedItems).toBe(null);
            expect(component.selectedType).toBe('TypeA.Name');
            expect(component['getType']).toHaveBeenCalled();
            expect(component['getPlugins']).toHaveBeenCalled();
            expect(component['getInstances']).toHaveBeenCalled();
            expect(component['resetSidebars']).toHaveBeenCalled();
        });
        it('should request data for type StarsTypes.Vehicles', () => {
            spyOn<any>(component, 'getType').and.callFake(() => {});
            spyOn<any>(component, 'getPlugins').and.callFake(() => {});
            spyOn<any>(component, 'getInstances').and.callFake(() => {});
            spyOn<any>(component, 'resetSidebars').and.callFake(() => {});

            component.onLibrarySelection({ ...libraryTypeA(), name: StarsTypes.Vehicles });
            expect(component.selectedItems).toBe(null);
            expect(component.selectedType).toBe(StarsTypes.Vehicles);
            expect(component.selectionSidebar).toBeTruthy();
            expect(component['getType']).toHaveBeenCalledTimes(1);
            expect(component['getType']).toHaveBeenCalledWith(StarsTypes.Vehicles);
            expect(component['getPlugins']).toHaveBeenCalledTimes(1);
            expect(component['getPlugins']).toHaveBeenCalledWith(StarsTypes.Vehicles);
            expect(component['getInstances']).toHaveBeenCalledTimes(1);
            expect(component['resetSidebars']).toHaveBeenCalledTimes(1);
        });
    });
    describe('onItemSelection', () => {
        it('should set selectedInstance', () => {
            const expectedVehicle: IVehicle = {Type: 'StarsEnterprise.Example.Vehicle'} as IVehicle;
            spyOn<any>(component, 'configureVehicleToolbar').and.callFake(() => {});
            component.onItemSelection({} as MouseEvent, expectedVehicle);
            expect(component.selectedInstance).toBe(expectedVehicle);
            expect(component['configureVehicleToolbar']).toHaveBeenCalledTimes(1);
            expect(component['configureVehicleToolbar']).toHaveBeenCalledWith(expectedVehicle);
        });
    });
    it('getContextMenuFn should return the function', () => {
        const expectedVehicle: IVehicle = {} as IVehicle;

        expect(typeof component.getContextMenuFn(expectedVehicle)).toBe('function');
    });
    
    it('getType should set type', () => {
        spyOn<any>(httpService, 'get$').and.callFake(() => {
            return of({ TypeInfos: [getMockTypeB(), getMockTypeA()] });
        });
        component.ngOnInit();
        component['getType'](getMockTypeA().Name);
        expect(component.currentType).toEqual({ ...getMockTypeA(), Properties: [], TypeDeclarations: [] });
    });
    it('getPlugins should behave...', () => {
        const expectedPlugins: Array<IPlugin> = [{ Name: 'test' } as IPlugin];
        spyOn<any>(pluginsService, 'getPluginsForType$').and.returnValue(of(expectedPlugins));
        component['getPlugins'](getMockTypeA().Name);
        expect(pluginsService.getPluginsForType$).toHaveBeenCalledTimes(1);
        expect(pluginsService.getPluginsForType$).toHaveBeenCalledWith(getMockTypeA().Name);
        expect(component.plugins).toEqual(expectedPlugins);
    });
    describe('getInstances', () => {
        it('should request and set vehicles and initiate selectionService', () => {
            const vehicles: Array<IVehicle> = [1, 2, 3, 4].map(n => {
                const v: IVehicle = getVehicle();
                return { ...v, Name: `${v.Name}${n}` };
            });
            const selectionItems: Array<ICommonColumnSelection> = vehicles.map(component['toSelectionItems']);
            spyOn<any>(mainSelectionService, 'setAvailableItems').and.callFake(() => {});
            spyOn<any>(mainSelectionService, 'setDisplayedItems').and.callFake(() => {});
            spyOn<any>(mainSelectionService, 'setDefaultItems').and.callFake(() => {});
            spyOn<any>(snackBarService, 'open').and.callFake(() => {});
            spyOn<any>(component, 'toSelectionItems').and.returnValues(...selectionItems);
            spyOn<any>(component, 'getInstances$').and.callFake((vehicleQuery: Query) => {
                expect(vehicleQuery.value).toBe(
                    'StarsEnterprise.Example.Vehicle?properties={"Name":1,"DisplayName":1,"Version":1,"Type":1,"ModelName":1,"OnDynoVehicleModel":1,"VehicleModel":1}&order={"DisplayName":1}'
                );
                return of({ ResourceInfos: vehicles });
            });
            component['getInstances'](StarsTypes.Vehicles);
            expect(component.items).toEqual(vehicles);
            expect(mainSelectionService.setAvailableItems).toHaveBeenCalledTimes(1);
            expect(mainSelectionService.setAvailableItems).toHaveBeenCalledWith(selectionItems);
            expect(mainSelectionService.setDisplayedItems).toHaveBeenCalledTimes(1);
            expect(mainSelectionService.setDisplayedItems).toHaveBeenCalledWith(selectionItems.slice(0, numberOfItemsToDisplay));
            expect(mainSelectionService.setDefaultItems).toHaveBeenCalledTimes(1);
            expect(mainSelectionService.setDefaultItems).toHaveBeenCalledWith(selectionItems.slice(0, numberOfItemsToDisplay));
            expect(component.selectedItems).toEqual(vehicles.slice(0, numberOfItemsToDisplay));
            expect(snackBarService.open).toHaveBeenCalledTimes(1);
            expect(snackBarService.open).toHaveBeenCalledWith('main_found_N_items', '4');
        });
        it('should handle onApply$ from SelectionService properly', () => {
            const vehicles: Array<IVehicle> = [1, 2, 3, 4].map(n => {
                const v: IVehicle = getVehicle();
                return { ...v, Name: `${v.Name}${n}` };
            });
            const selectionItems: Array<ICommonColumnSelection> = vehicles.map(component['toSelectionItems']);
            spyOn<any>(component, 'getInstances$').and.callFake(() => of({ ResourceInfos: vehicles }));
            component['getInstances'](StarsTypes.Vehicles);
            (mainSelectionService.onApply$().source as Subject<IColumnSelectionChanges>).next({
                displayedColumns: selectionItems.slice(0, 1),
            } as IColumnSelectionChanges);
            expect(component.selectedItems).toEqual(vehicles.slice(0, 1));
            (mainSelectionService.onApply$().source as Subject<IColumnSelectionChanges>).next({
                displayedColumns: selectionItems.slice(0, 3),
            } as IColumnSelectionChanges);
            expect(component.selectedItems).toEqual(vehicles.slice(0, 3));
        });
    });
    it('toSelectionItems should return ICommonColumnSelection', () => {
        const vehicles: Array<IVehicle> = [1, 2, 3].map(n => {
            const v: IVehicle = getVehicle();
            return { ...v, Name: `${v.Name}${n}`, DisplayName: `${v.DisplayName}${n}` };
        });
        const selectionItems: any = vehicles.map(component['toSelectionItems']);
        expect(selectionItems).toEqual([
            { name: 'VehicleName1', displayName: 'VehicleDisplayName1' },
            { name: 'VehicleName2', displayName: 'VehicleDisplayName2' },
            { name: 'VehicleName3', displayName: 'VehicleDisplayName3' },
        ]);
    });

    it('getInstances$ should call httpService with query', () => {
        const vehicleProperties: Object = {
            Name: 1,
            DisplayName: 1,
            Version: 1,
            Type: 1,
            ModelName: 1,
            OnDynoVehicleModel: 1,
            VehicleModel: 1,
        };
        const vehicleQuery: Query = new Query(StarsTypes.Vehicles)
            .properties(vehicleProperties)
            .order({ orderBy: 'DisplayName', direction: 1 });
        spyOn<any>(httpService, 'get$').and.returnValue('test');
        expect(component['getInstances$'](vehicleQuery)).toBe('test' as any as Observable<unknown>);
        expect(httpService.get$).toHaveBeenCalledTimes(1);
        expect(httpService.get$).toHaveBeenCalledWith(
            'undefined/instances/StarsEnterprise.Example.Vehicle?properties={"Name":1,"DisplayName":1,"Version":1,"Type":1,"ModelName":1,"OnDynoVehicleModel":1,"VehicleModel":1}&order={"DisplayName":1}',
            false,
            'MainComponent'
        );
    });
});

function getMockService(): any {
    const rs: ReplaySubject<IColumnSelectionChanges> = new ReplaySubject<IColumnSelectionChanges>(1);
    return {
        httpService: {
            get$: () => of({ TypeInfos: [] }),
        },
        pluginsService: {
            getPluginsForType$: () => of([]),
        },
        mainSelectionService: {
            setAvailableItems: () => {},
            setDisplayedItems: () => {},
            setDefaultItems: () => {},
            onApply$: () => rs,
        },
        snackBarService: {
            open: () => {},
        },
    };
}

function getMockTypeA(): IResourceType {
    return {
        Name: 'TypeA.Name',
        DisplayName: 'TypeA.DisplayName',
    };
}

function getMockTypeB(): IResourceType {
    return {
        Name: 'TypeB.Name',
    };
}

function libraryTypeA(): ILibraryEntry {
    return {
        name: 'TypeA.Name',
        displayName: 'TypeA.DisplayName',
        img: 'assets/images/app-specific/resource-type-blue.png',
        img_disabled: 'assets/images/app-specific/resource-type-grey.png',
    };
}

function getVehicle(): IVehicle {
    return {
        Name: 'VehicleName',
        DisplayName: 'VehicleDisplayName',
        VehicleModel: {},
        OnDynoVehicleModel: {},
    } as IVehicle;
}

enum StarsTypes {
    Vehicles = 'StarsEnterprise.Example.Vehicle',
    Fuels = 'StarsEnterprise.Example.Fuel',
    Bottles = 'StarsEnterprise.GasBottles.Bottle',
    Persons = 'StarsEnterprise.Examples.Person',
}
interface IVehicleModel {
    VehicleInertia: number;
    RoadLoadCoefficientA: number;
    RoadLoadCoefficientB: number;
    RoadLoadCoefficientC: number;
}
interface IBaseMetadata {
    Name: string;
    DisplayName: string;
    Type: string;
    Version: number;
}
interface IVehicle extends IBaseMetadata {
    VehicleModel: IVehicleModel;
    OnDynoVehicleModel: IVehicleModel;
}
interface IInstances<T> {
    ResourceInfos: Array<T>;
}
